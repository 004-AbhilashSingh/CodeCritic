# Stage 1: Build Angular app
FROM node:20-alpine AS frontend-build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Create the static directory before building
RUN mkdir -p src/main/resources/static
RUN npm run ci-build-deploy

# Stage 2: Build Spring Boot app
FROM maven:3.9.6-eclipse-temurin-21-alpine AS backend-build
WORKDIR /app
COPY pom.xml .
COPY src ./src

COPY --from=frontend-build /app/src/main/resources/static ./src/main/resources/static
RUN mvn clean package -DskipTests -Dmaven.compiler.release=21

# Stage 3: Run the app
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=backend-build /app/target/*.jar app.jar

# Create directory for external config
RUN mkdir -p /config
VOLUME /config

EXPOSE 8080
ENV PORT=8080
ENTRYPOINT ["java", \
    "-Dserver.port=${PORT}", \
    "-Dspring.config.additional-location=file:/config/", \
    "-jar", "app.jar"]