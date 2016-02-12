# Exynize platform

> Exynize platform - easy creation of complex processing pipelines for your data.

## About Exynize platform

Exynize platform aims to simplifying the workflow and allow rapid creation of data processing pipelines and visualisations.
Current version of the platform allows:
- constructing pipelines right in your browsers with very little effort,
- writing processing component as if you was dealing with a single data item,
- re-using existing processing modules in new pipelines,
- creating real-time processing and visualisation without thinking about doing real-time at all,
- spending time on doing actual work, not fiddling with scaffolding.

More info on the platform as well as some demoes of its capabilities can be found in the following article on Medium
> [Building data processing and visualisation pipelines in the browser with Exynize](https://medium.com/the-data-experience/building-data-processing-and-visualisation-pipelines-in-the-browser-with-exynize-372ab15e848c#.cq73g7k7q)

## Getting started

This is a deployment repository for Exynize platform.
It contains docker-compose file that can be used to easily setup your own copy of exynize platform.

If you are interested in separate platform components, then can be found in other repositories:

- [Exynize UI](https://github.com/Exynize/exynize-ui)
- [Exynize REST](https://github.com/Exynize/exynize-rest)
- [Exynize Runner](https://github.com/Exynize/exynize-runner)

### Requirements

For Exynize platform to function properly, you'll need to have following things installed:

- Docker v1.10 or later
- Docker-compose 1.6 or later

### Installation

1. Clone the repository and cd into new folder: `git clone git@github.com:Exynize/exynize-platform.git && cd exynize-platform`
2. Execute `git submodule init && git submodule update` to get latest sources for platform components
3. Execute `docker-compose up` to start Exynize platform
4. Navigate to `http://your.docker.address` using browser to see the platform UI

### Configuration

To apply your custom config you need to do the following steps:

1. Copy `./env/default-rest.env` and edit variables to your liking
2. Add new entry with your file to `rest.env_file` section in `docker-compose.yml`, it should look like this:
```yml
rest:
  build: exynize-rest
  depends_on:
    - rdb
    - rabbit
  links:
    - rdb
    - rabbit
  volumes:
    - ./data/static:/opt/app/src/static
  environment:
    - NODE_ENV=production
  env_file:
    - ./env/default-rest.env
    - ./my-rest.env
```
3. Restart the containers

### RethinkDB admin UI

By default you can access RethinkDB UI at `http://your.docker.address:8080`.
This can be disabled by commenting out `rdb.ports` entry in `docker-compose.yml`.

### RabbitMQ admin UI

By default you can access RabbitMQ admin UI at `http://your.docker.address:8081`.
This can be disabled by commenting out `rabbit.ports` entry in `docker-compose.yml`.

## License

Dual licensed under LGPL-3.0 and commercial license.
See LICENSE.md file for more details.
