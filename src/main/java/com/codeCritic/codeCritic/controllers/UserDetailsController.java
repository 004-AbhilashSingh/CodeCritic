package com.codeCritic.codeCritic.controllers;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class UserDetailsController {

    @GetMapping("/getUserName")
    public String getUserName() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(authentication != null && authentication.isAuthenticated()){
            OAuth2User user = (OAuth2User) authentication.getPrincipal();
            Map<String,Object> userDetails;
            userDetails = user.getAttributes();
            return userDetails.get("name").toString();
        }
        return "User not authenticated";
    }

    @GetMapping("/getUserImageUrl")
    public String getUserImageUrl() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(authentication != null && authentication.isAuthenticated()){
            OAuth2User user = (OAuth2User) authentication.getPrincipal();
            Map<String,Object> userDetails;
            userDetails = user.getAttributes();
            return userDetails.get("avatar_url").toString();
        }
        return "";
    }

}
