package com.codeCritic.codeCritic.controllers;

import com.codeCritic.codeCritic.models.DiffRequest;
import com.codeCritic.codeCritic.services.AuthenticationService;
import com.codeCritic.codeCritic.services.GithubService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;


@RestController
public class UserDetailsController {

    private final AuthenticationService authenticationService;

    public UserDetailsController(AuthenticationService authenticationService, GithubService githubService) {
        this.authenticationService = authenticationService;
    }

    @GetMapping("/getUserName")
    public String getUserName() {
        Map<String, Object> userDetails = authenticationService.getUserDetails();
        if (userDetails != null && userDetails.containsKey("name")) {
            return (String) userDetails.get("name");
        }
        return "User not authenticated";
    }

    @GetMapping("/getUserLogin")
    public String getUserLogin() {
        Map<String, Object> userDetails = authenticationService.getUserDetails();
        if (userDetails != null && userDetails.containsKey("login")) {
            return (String) userDetails.get("login");
        }
        return "User not authenticated";
    }

    @GetMapping("/getUserImageUrl")
    public String getUserImageUrl() {
        Map<String, Object> userDetails = authenticationService.getUserDetails();
        if (userDetails != null && userDetails.containsKey("avatar_url")) {
            return (String) userDetails.get("avatar_url");
        }
        return "";
    }

}
