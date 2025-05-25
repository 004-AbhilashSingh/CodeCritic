package com.codeCritic.codeCritic.services;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class AuthenticationService {

    private final OAuth2AuthorizedClientService oAuth2AuthorizedClientService;

    public AuthenticationService(OAuth2AuthorizedClientService oAuth2AuthorizedClientService) {
        this.oAuth2AuthorizedClientService = oAuth2AuthorizedClientService;
    }

    public Map<String, Object> getUserDetails() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            OAuth2User user = (OAuth2User) authentication.getPrincipal();
            if (user != null) {
                return user.getAttributes();
            }
        }
        return null;
    }

    public String getAccessToken() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            OAuth2AuthenticationToken oAuth2AuthenticationToken = (OAuth2AuthenticationToken) authentication;
            String clientRegistrationId = oAuth2AuthenticationToken.getAuthorizedClientRegistrationId();
            String name = oAuth2AuthenticationToken.getName();
            OAuth2AuthorizedClient client = oAuth2AuthorizedClientService.loadAuthorizedClient(clientRegistrationId, name);
            if(client != null) {
                return client.getAccessToken().getTokenValue();
            }
        }
        return null;
    }

}
