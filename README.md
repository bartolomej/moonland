# MoonLand

MoonLand queries social media platforms to provide social sentiment analytics for various crypto coins.

## 👋 Get started

1. You need to install Docker & docker-compose in order to run this app with Docker. 
See: [Docker installation instructions](https://www.docker.com/get-started)

2. Add environment variables
Create `.env` file in project root, with environment variables defined in `.env.example`

3. Once you have installed and setup docker, run:
    ```shell
    docker-compose up -d
    ```
   
   Your local app should now be up and running on http://localhost:5000 🥳.

## 🏛 Architecture

MoonLand is based on a simple microservice architecture, with 2 services:
- `analytics` is concerned with data aggregation and analysis
- `gateway` deals with user management and authentication (also acts as a proxy)

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/94454d91-0869-401a-8d15-7f226086ea50/ShitcoinAnalysisArchitecture.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20211118%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20211118T192639Z&X-Amz-Expires=86400&X-Amz-Signature=224cf896bd44696f7d35fd6ddbfb8becf33be1095584df98bc0764a3f6535eb1&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22ShitcoinAnalysisArchitecture.png%22&x-id=GetObject)

## ✌️ Contributors

- Bartolomej Kozorog (63200152)
- Jan Šuklje (63180292)
