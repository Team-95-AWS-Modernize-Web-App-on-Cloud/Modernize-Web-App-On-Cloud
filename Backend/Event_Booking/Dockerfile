FROM maven:3.8.4-openjdk-17 as BUILD
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean install

FROM openjdk:17-alpine
WORKDIR /app
COPY --from=BUILD /app/target/Event-Booking-0.0.1-SNAPSHOT.jar ./Event-Booking.jar
EXPOSE 8082
ENTRYPOINT ["java", "-jar", "Event-Booking.jar"]