package com.example.be.util.sercurity;

import com.example.be.service.CustomUserDetailsService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider jwtTokenProvider;
    private final CustomUserDetailsService customUserDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");

        System.out.println("Authorization header: " + authHeader); // Log header để debug

        // Kiểm tra header có chứa Bearer token không
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);

            try {
                System.out.println("Token received: " + token); // Log token

                String username = jwtTokenProvider.getUsernameFromToken(token);
                System.out.println("Username from token: " + username);

                String rolesString = jwtTokenProvider.getRolesFromToken(token);
                System.out.println("Roles from token: " + rolesString);

                // Nếu chưa có Authentication trong context thì tiến hành xác thực
                if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                    UserDetails userDetails = customUserDetailsService.loadUserByUsername(username);
                    System.out.println("UserDetails authorities: " + userDetails.getAuthorities());

                    List<SimpleGrantedAuthority> authorities = Arrays.stream(rolesString.split(","))
                            .map(SimpleGrantedAuthority::new)
                            .collect(Collectors.toList());
                    System.out.println("Authorities to set in context: " + authorities);

                    UsernamePasswordAuthenticationToken authToken =
                            new UsernamePasswordAuthenticationToken(userDetails, null, authorities);
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                    SecurityContextHolder.getContext().setAuthentication(authToken);
                    System.out.println("Authentication set in SecurityContextHolder");
                }
            } catch (Exception e) {
                // Ghi log nếu token không hợp lệ hoặc lỗi xử lý token
                System.out.println("JWT token không hợp lệ hoặc bị lỗi: " + e.getMessage());
            }
        } else {
            System.out.println("No Authorization header or does not start with Bearer");
        }

        filterChain.doFilter(request, response);
    }
}
