package com.codeCritic.codeCritic.controllers;

import com.codeCritic.codeCritic.models.DiffRequest;
import com.codeCritic.codeCritic.services.GithubService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class GithubController {

    private final GithubService githubService;

    public GithubController(GithubService githubService) {
        this.githubService = githubService;
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

    @PostMapping("/addComment")
    public String addComment(@RequestBody Object requestBody) {
        String url = (String) ((Map<?, ?>) requestBody).get("url");
        String comment = (String) ((Map<?, ?>) requestBody).get("comment");
        String sha = (String) ((Map<?, ?>) requestBody).get("sha");
        return githubService.addCommentToPullRequest(url, comment, sha);
    }
}
