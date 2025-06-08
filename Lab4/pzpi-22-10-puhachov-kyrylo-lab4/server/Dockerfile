FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /app


COPY Bridges/Bridges.csproj ./Bridges/
RUN dotnet restore ./Bridges/Bridges.csproj


COPY Bridges/. ./Bridges/
WORKDIR /app/Bridges
RUN dotnet publish -c Release -o /app/publish


FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .

ENTRYPOINT ["dotnet", "Bridges.dll"]