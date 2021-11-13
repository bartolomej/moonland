# Shitcoin Analysis App

Crypto ecosystem is evolving rapidly. There is a bunch of serious projects looking to build a blockchain platform to be used in the real world. But that also means there is a lot of sh** projects, with no utility whatsoever. But where is sh**, there is also money 🤑. Why wouldn't "insert shitcoin name here" grow 100x, if there is a lot of people saying it will ??

## Get started

### Run with docker
1. You need to install Docker & docker-compose in order to run this app with Docker. 
See: [Docker installation instructions](https://www.docker.com/get-started)

2. Add environment variables
Create `.env` file in project root, with environment variables defined in `.env.example`

3. Once you have installed and setup docker, run:
    ```shell
    docker-compose up -d
    ```

### Run gateway app locally
1. You need to set up you local environment by [installing .NET](https://dotnet.microsoft.com/download)

2. Run bellow command to restore the packages:
    ```bash
    dotnet restore # must be run in /gateway directory
    ```
   
3. Start the app by running:
    ```shell
    dotnet run 
    ```
    ... or use the `watch` command to automatically rerun the app when source files change:
    ```shell
    dotnet watch run
    ```

You can also check [Tutorial: Create a web API with ASP.NET Core](https://docs.microsoft.com/en-us/aspnet/core/tutorials/first-web-api?view=aspnetcore-5.0&tabs=visual-studio-code)
