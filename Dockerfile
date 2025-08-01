# Stage 1: Build Angular app
FROM node:20-alpine AS frontend-build
# Uses Node.js 20 with Alpine Linux as base image for Angular build, named 'frontend-build'

WORKDIR /app
# Sets the working directory to /app for all subsequent commands

COPY package*.json ./
# Copies package.json and package-lock.json to copy dependencies first (layer caching)

RUN npm install
# Installs all Node.js dependencies defined in package.json

COPY . .
# Copies all project files to the container

RUN npm run ci-build-deploy
# Runs the script that builds Angular app and copies it to static resources

# Stage 2: Build Spring Boot app
FROM maven:3.9.6-eclipse-temurin-21-alpine AS backend-build
# Uses Maven with Eclipse Temurin JDK 21 on Alpine for Spring Boot build

WORKDIR /app
# Sets working directory for Maven build

COPY pom.xml .
# Copies Maven configuration file

COPY src ./src
# Copies source code files

COPY --from=frontend-build /app/src/main/resources/static ./src/main/resources/static
# Copies built Angular files from frontend stage to Spring Boot static resources

RUN mvn clean package -DskipTests
# Builds the Spring Boot JAR file, skipping tests

# Stage 3: Final runtime image
FROM eclipse-temurin:21-jre-alpine
# Uses minimal JRE 21 image for running the application

WORKDIR /app
# Sets working directory for the runtime container

COPY --from=backend-build /app/target/*.jar app.jar
# Copies the built JAR from backend stage, naming it app.jar

EXPOSE 8080
# Documents that the container listens on port 8080

ENV PORT=8080
# Sets default PORT environment variable for Render

ENTRYPOINT ["java", "-Dserver.port=${PORT}", "-jar", "app.jar"]
# Starts the Spring Boot application with dynamic port configuration