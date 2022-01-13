# MoonLand

MoonLand queries social media platforms to provide social sentiment analytics for various crypto coins.

| Discover shitcoins          | Filter by search term    | View coin details              |
|-----------------------------|------------------------------|--------------------------------|
| ![](./images/coin-list.png) | ![](./images/coin-search.png) | ![](./images/coin-details.png) |

| View bookmark list              | Change user settings           | 
|---------------------------------|--------------------------------|
| ![](./images/web-bookmarks.png) | ![](./images/web-settings.png) |

## 👋 Get started

1. You need to install Docker & docker-compose in order to run this app with Docker. 
See: [Docker installation instructions](https://www.docker.com/get-started)

2. Add environment variables
Create `.env` file in project root, with environment variables defined in `.env.example`

3. Once you have installed and setup docker, run:
    ```shell
   # run development configuration
    docker-compose up -d
   
   # run production configuration
   docker-compose -f docker-compose.yml -f docker-compose.prod.yml up
    ```
   
   Your local app should now be up and running on http://localhost:5000 🥳.

## 🏛 Architecture

Moonland data model is designed with extensibility in mind. We could easily extend the platform to support multiple data sources (aka. "social platforms"), etc.

![](./images/data-model.png)

In terms of application architecture, Moonland is based on a simple microservice architecture, with 2 services:
- `analytics` is concerned with data aggregation and analysis
- `gateway` deals with user management and authentication (also acts as a proxy)

<p align="center">
    <img src="https://user-images.githubusercontent.com/36109955/143024077-9d8a4e2e-ddc7-49ed-8f1c-0f5e6b812a1b.png" width="700" />
</p>

## ✌️ Contributors

- Bartolomej Kozorog (63200152)
- Jan Šuklje (63180292)
