# Shitcoin Analysis App

Crypto ecosystem is evolving rapidly. There is a bunch of serious projects looking to build a blockchain platform to be used in the real world. But that also means there is a lot of sh** projects, with no utility whatsoever. But where is sh**, there is also money 🤑. Why wouldn't "insert shitcoin name here" grow 100x, if there is a lot of people saying it will ??

## Get started

### Run with docker
You need to install Docker & docker-compose in order to run this app with Docker. 
See: [Docker installation instructions](https://www.docker.com/get-started)

Once you have installed and setup docker, run:
```shell
docker-compose up -d
```

### Run with local envirnoment
You need to setup you local envirnoment by [installing .NET](https://dotnet.microsoft.com/download)

Run bellow command to restore the packages:
```bash
dotnet restore # must be run in /gateway directory
```

Start the app by running:
```shell
dotnet run 
```
... or use the `watch` command to automatically rerun the app when source files change:
```shell
dotnet watch run
```

You can also check [Tutorial: Create a web API with ASP.NET Core](https://docs.microsoft.com/en-us/aspnet/core/tutorials/first-web-api?view=aspnetcore-5.0&tabs=visual-studio-code)
