# Products Gallery (Backend):

- The Backend app is built with Java Spring Boot

- For the Product data, the app uses the `dummyjson` API, here is the link: https://dummyjson.com/docs/products

- The Backend techstack also includes: PayPal SDK, Lombok, Spring Profiles, and Docker

## Getting Started

### Pre-requisite and Local Development

- Developers should have Java 17 installed in their local machine. If you don't have Java 11 installed, you can download it from [Java 17](https://www.oracle.com/java/technologies/javase-jdk17-downloads.html)

- Developers should have Docker installed in their local machine. If you don't have Docker installed, you can download it from [Docker](https://www.docker.com/products/docker-desktop)

- Developers should have Maven installed in their local machine. If you don't have Maven installed, you can download it from [Maven](https://maven.apache.org/download.cgi)

- Developers are recommended to use IntelliJ IDEA as the IDE for the Backend Java Spring Boot project. If you don't have IntelliJ IDEA installed, you can download it from [IntelliJ IDEA](https://www.jetbrains.com/idea/download/)

- To start the Development server, run the following command in the terminal:

```bash
cd Backend
cd products-gallery
java -jar products-gallery-0.0.1-SNAPSHOT.jar --spring.profiles.active=development
```

- Or: you can also run the Backend Java Spring Boot in the IntelliJ IDEA by opening the project in the IntelliJ IDEA, and then, run the `ProductsGalleryApplication.java` file

- The Backend Java Spring Boot will start running on `http://localhost:8081/`. Open the browser and navigate to `http://localhost:8081/` to see the Backend Java Spring Boot.

### Backend Folder Structure

- The Backend Java Spring Boot has the following structure:
  - `src/` folder: contains all the src code of the Backend
    - `main/` folder: contains the main code of the Backend
      - `java/` folder: contains the Java code of the Backend
        - `com/` folder: contains the com code of the Backend
          - `project/` folder: contains the products code of the Backend
            - `productsgallery/` folder
              - `Config/` folder: contains the Configurations of the Backend
                - `PayPalConfig.java` file: contains the PayPal Configuration of the Backend (for the PayPal APIContext, ClientID, and ClientSecret)
                - `MyAppConfig.java` file: contains the App Configuration of the Backend (for the Allowed Origins)
              - `PayPal/` folder
                - `PayPalService.java` file: contains the PayPal Service of the Backend (for the PayPal Payment)
                - `PayPalController/` folder: contains the controller for the PayPalService
              - `ProductsGalleryApplication.java` file: contains the main class of the Backend
      - `resources/` folder: contains the resources of the Backend
        - `application.properties` file: contains the properties of the Backend for both Development, and Production environment
        - `application-development.properties` file: contains the properties of the Backend for the Development environment
        - `application-production.properties` file: contains the properties of the Backend for the Production environment
    - `test/` folder: contains the test code of the Backend
      - `java/` folder: contains the Java test code of the Backend
        - `com/` folder: contains the com test code of the Backend
          - `productsgallery/` folder: contains the products test code of the Backend
            - `ProductsGalleryApplicationTests.java` file: contains the test class of the Backend
  - `Dockerfile` file: contains the Dockerfile of the Backend
  - `pom.xml` file: contains the dependencies, plugins of the Backend
  - `Backend_README.md` file: contains the README of the Backend
  - `.gitignore` file: contains the gitignore of the Backend

### Backend API Endpoints

- The Backend has those following endpoints for PayPal Integration with Frontend:

1. POST /payment/create:

   - Description: Create a Payment with PayPal
   - Request Body:
     - `amount`: the amount of the payment
     - `currency`: the currency of the payment
     - `method`: the method of the payment
     - `description`: the description of the payment
   - Response:
   - If the payment is created successfully, then, return the href of the `approval_url` for Frontend to redirect Payer to the Payment Success Page
   - If the payment failed, then, return 500 INTERNAL_SERVER_ERROR to Frontend to redirect Payer to Payment Failure Page

2. The other endpoints: GET /payment/success, GET payment/cancel, GET payment/error: are for the Thymeleaf pages for the Payment Success, Payment Cancel, and Payment Error (which are for learning purpose, and not used in this project)

## Deployment

- The Backend of the app has been deployed on Render. You can access it by clicking on this link: `https://products-gallery-spring-boot.onrender.com`
- This Backend API URL is also integrated with the Frontend of the app, which is also hosted on Render, so that the Frontend can interact with the Backend API.

- I am considering deploy the Java Spring Boot Backend to AWS for better performance and scalability. I will update the README once the Backend is deployed on AWS.

## Author:

Quan Tran

## Acknowledgements

- Thanks to Burning Bros Company for the inspiration of the Products Gallery Application
