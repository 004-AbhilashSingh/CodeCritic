package com.codeCritic.codeCritic.services;

import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


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

}
