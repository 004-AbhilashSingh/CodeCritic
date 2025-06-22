package com.codeCritic.codeCritic.models;

public class DiffRequest {
    private String repositoryName;
    private int pullNumber;

    public DiffRequest(String repositoryName, int pullNumber) {
        this.repositoryName = repositoryName;
        this.pullNumber = pullNumber;
    }

    public String getRepositoryName() {
        return repositoryName;
    }

    public void setRepositoryName(String repositoryName) {
        this.repositoryName = repositoryName;
    }

    public int getPullNumber() {
        return pullNumber;
    }

    public void setPullNumber(int pullNumber) {
        this.pullNumber = pullNumber;
    }
}
