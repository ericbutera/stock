FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build
WORKDIR /source

# copy csproj and restore as distinct layers
COPY api/*.csproj api/
COPY stocklib/*.csproj stocklib/
RUN dotnet restore api/api.csproj

# copy and publish app and libraries
COPY api/ api/
COPY stocklib/ stocklib/
WORKDIR /source/api
RUN dotnet build -c release --no-restore

FROM build AS publish
RUN dotnet publish -c release --no-build -o /app

# final stage/image
FROM mcr.microsoft.com/dotnet/core/aspnet:3.1
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT [ "dotnet", "api.dll" ]

