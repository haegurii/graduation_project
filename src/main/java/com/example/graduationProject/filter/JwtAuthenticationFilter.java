package com.example.graduationProject.filter;

import com.example.graduationProject.security.TokenProvider;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    //request가 들어올 때 request header의 authorization 필드의 bearer token 값을 가져옴
    //가져온 토큰을 검증하고 검증 결과를 securitycontext에 추가

    @Autowired private TokenProvider tokenProvider;
    @Override
    protected void doFilterInternal (HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)throws ServletException, IOException {
    String token = parseBearerToken(request);

    try {
        if (token != null && !token.equalsIgnoreCase("null")) {
            //토큰 검증해서 payload의 email을 가져옴
            String email = tokenProvider.validate(token);

            //securitycontext에 추가할 객체
            AbstractAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(email, null, AuthorityUtils.NO_AUTHORITIES);
            authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

            //securitycontext에 abstractauthenticationtoken객체를 추가해서 해당 thread가 지속적으로 인증정보를 가질 수 있도록 해줌
            SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
            securityContext.setAuthentication(authentication);
            SecurityContextHolder.setContext(securityContext);
            }
        }catch(Exception exception) {
        exception.printStackTrace();
        }

    filterChain.doFilter(request, response);
    }

        //request header의 authorization 필드의 bearer token 값을 가져오는 메서드
    private String parseBearerToken(HttpServletRequest request){
    String bearerToken = request.getHeader("Authorization");

    if(StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer "))
        return bearerToken.substring(7);//토큰에서 bearer 이후 7번부터 가져와야 하므로
        return null;
    }
}

