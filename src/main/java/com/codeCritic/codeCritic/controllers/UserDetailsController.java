package com.codeCritic.codeCritic.controllers;

import com.codeCritic.codeCritic.models.DiffRequest;
import com.codeCritic.codeCritic.services.AuthenticationService;
import com.codeCritic.codeCritic.services.GithubService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;


@RestController
public class UserDetailsController {

    private final AuthenticationService authenticationService;
    private final GithubService githubService;

    public UserDetailsController(AuthenticationService authenticationService, GithubService githubService) {
        this.authenticationService = authenticationService;
        this.githubService = githubService;
    }

    @GetMapping("/getUserName")
    public String getUserName() {
        Map<String, Object> userDetails = authenticationService.getUserDetails();
        if (userDetails != null && userDetails.containsKey("name")) {
            return (String) userDetails.get("name");
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

    @GetMapping("/getUserRepositories")
    public Object getUserRepositories() {
        return githubService.getRepositories();
    }

    @PostMapping("/getUserPullRequests")
    public Object getUserPullRequests(@RequestBody String repository) {
        return githubService.getPullRequests(repository);
    }

    @GetMapping("/getUserOrgs")
    public Object getUserOrgs() {
        return githubService.getUserOrgs();
    }

    @PostMapping("/getOrgRepositories")
    public Object getOrgRepositories(@RequestBody String orgName) {
        return githubService.getOrgRepositories(orgName);
    }

    @PostMapping("/getDiff")
    public String getDiff(@RequestBody DiffRequest requestBody) {
        return githubService.getDiffOfPullRequest(requestBody.getRepositoryName(), requestBody.getPullNumber());
    }
}
