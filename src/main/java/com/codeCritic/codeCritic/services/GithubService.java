package com.codeCritic.codeCritic.services;

import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;


@Service
public class GithubService {

    private final AuthenticationService authenticationService;
    private final RestTemplate restTemplate;
    private final String url;

    public GithubService(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
        this.restTemplate = new RestTemplate();
        this.url = "https://api.github.com";
    }

    public List<String> getRepositories() {
        String token = authenticationService.getAccessToken();
        String repoUrl = url+"/user/repos";
        HttpHeaders headers = new HttpHeaders();
        headers.set("accept","application/vnd.github+json");
        headers.setBearerAuth(token);
        headers.set("X-GitHub-Api-Version", "2022-11-28");
        HttpEntity<String> entity = new HttpEntity<>(headers);
        ResponseEntity<Object> response = restTemplate.exchange(
                repoUrl,
                HttpMethod.GET,
                entity,
                Object.class
        );
        Object body = response.getBody();
        List<?> repositories;
        List<String> repositoriesNames = new ArrayList<String>();
        if(body instanceof List<?>){
            repositories = (List<?>) body;
            for (Object o : repositories) {
                Map<?,?> repository = (Map<?,?>) o;
                if (repository.containsKey("full_name")) {
                    String name = (String) repository.get("full_name");
                    repositoriesNames.add(name);
                }
            }
            return repositoriesNames;
        }
        return null;
    }

    public List<?> getUserOrgs() {
        String token = authenticationService.getAccessToken();
        String repoUrl = url+"/user/orgs";
        HttpHeaders headers = new HttpHeaders();
        headers.set("accept","application/vnd.github+json");
        headers.setBearerAuth(token);
        headers.set("X-GitHub-Api-Version", "2022-11-28");
        HttpEntity<String> entity = new HttpEntity<>(headers);
        ResponseEntity<Object> response = restTemplate.exchange(
                repoUrl,
                HttpMethod.GET,
                entity,
                Object.class
        );
        Object body = response.getBody();
        List<?> orgs;
        List<String> orgNames = new ArrayList<String>();
        if(body instanceof List<?>){
            orgs = (List<?>) body;
            for (Object o : orgs) {
                Map<?,?> org = (Map<?,?>) o;
                if (org.containsKey("login")) {
                    String name = (String) org.get("login");
                    orgNames.add(name);
                }
            }
            return orgNames;
        }
        return null;
    }

    public List<?> getPullRequests(String repository) {
        String token = authenticationService.getAccessToken();
        String pullRequestUrl = url + "/repos/" +  repository + "/pulls";
        HttpHeaders headers = new HttpHeaders();
        headers.set("accept","application/vnd.github+json");
        headers.setBearerAuth(token);
        headers.set("X-GitHub-Api-Version", "2022-11-28");
        HttpEntity<String> entity = new HttpEntity<>(headers);
        ResponseEntity<Object> response = restTemplate.exchange(
                pullRequestUrl,
                HttpMethod.GET,
                entity,
                Object.class
        );
        Object body = response.getBody();
        return (List<?>) body;
    }

    public List<String> getOrgRepositories(String orgName) {
        String token = authenticationService.getAccessToken();
        String repoUrl = url+"/orgs/"+orgName+"/repos";
        HttpHeaders headers = new HttpHeaders();
        headers.set("accept","application/vnd.github+json");
        headers.setBearerAuth(token);
        headers.set("X-GitHub-Api-Version", "2022-11-28");
        HttpEntity<String> entity = new HttpEntity<>(headers);
        ResponseEntity<Object> response = restTemplate.exchange(
                repoUrl,
                HttpMethod.GET,
                entity,
                Object.class
        );
        Object body = response.getBody();
        List<?> repositories;
        List<String> repositoriesNames = new ArrayList<String>();
        if(body instanceof List<?>){
            repositories = (List<?>) body;
            for (Object o : repositories) {
                Map<?,?> repository = (Map<?,?>) o;
                if (repository.containsKey("full_name")) {
                    String name = (String) repository.get("full_name");
                    repositoriesNames.add(name);
                }
            }
            return repositoriesNames;
        }
        return null;
    }

    public String getDiffOfPullRequest(String repository,int diffNumber) {
        String diffUrl = url + "/repos/" +  repository + "/pulls/" + diffNumber;
        String token = authenticationService.getAccessToken();
        HttpHeaders headers = new HttpHeaders();
        headers.set("accept","application/vnd.github.v3.diff");
        headers.setBearerAuth(token);
        headers.set("X-GitHub-Api-Version", "2022-11-28");
        HttpEntity<String> entity = new HttpEntity<>(headers);
        ResponseEntity<String> response = restTemplate.exchange(
                diffUrl,
                HttpMethod.GET,
                entity,
                String.class
        );
        return response.getBody();
    }

    public String addCommentToPullRequest(String url, String comment, String sha, boolean approve) {
        String commentUrl = url + "/reviews";
        String token = authenticationService.getAccessToken();
        String action = approve ? "APPROVE" : "COMMENT";
        HttpHeaders headers = new HttpHeaders();
        headers.set("accept","application/vnd.github+json");
        headers.setBearerAuth(token);
        headers.set("X-GitHub-Api-Version", "2022-11-28");
        Map<String, Object> body = new HashMap<>();
        body.put("body", comment);
        body.put("event", action);
        body.put("commit_id", sha);
        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);
        ResponseEntity<String> response = restTemplate.exchange(
                commentUrl,
                HttpMethod.POST,
                entity,
                String.class
        );
        if (response.getStatusCode() == HttpStatus.OK) {
            return "Comment added successfully.";
        } else {
            return "Failed to add comment: " + response.getStatusCode();
        }
    }

    

}
