# CSCI5410-SUMMER-23-SDP33
# Multi-Cloud Trivia Game

This project is a trivia game built on a multi-cloud architecture, utilizing the services offered by AWS and GCP. The game will employ various services such as AWS Lambda, GCP Firestore, Chat GPT, DynamoDB, SQS, SNS, Pub/Sub, QuickSight, GCP DataStudio, Looker Studio, and more.

## Installation

To run this project locally, you will need to have the following installed:

- Node.js
- AWS CLI
- GCP Cloud SDK

Once you have installed the necessary dependencies, you can clone this repository and run the following command to install the required packages:

```
npm install
```

## Configuration

Before running the project, you will need to configure your AWS and GCP credentials by running the following commands:

```
aws configure
gcloud auth login
```

You will also need to create the necessary resources in both AWS and GCP, such as the DynamoDB table, S3 bucket, and Firestore database. The necessary configuration files can be found in the `config` directory.

## Usage

To start the trivia game, run the following command:

```
npm start
```

This will start the server and allow users to connect and play the game.

## Architecture

This trivia game is built on a multi-cloud architecture, utilizing the services offered by both AWS and GCP. The game is designed to be scalable and fault-tolerant, with the ability to handle a large number of concurrent users.

The AWS services used in this project include:

- AWS Lambda: used to run serverless functions
- DynamoDB: used as the primary database for storing game data
- SQS and SNS: used for messaging and event-driven communication between services
- QuickSight: used for data visualization and analytics

The GCP services used in this project include:

- Firestore: used as a secondary database for storing user data and game logs
- Chat GPT: used for natural language processing and chatbot functionality
- Pub/Sub: used for messaging and event-driven communication between services
- DataStudio and Looker Studio: used for data visualization and analytics

## Contributing

If you are interested in contributing to this project, please fork the repository and submit a pull request. We welcome any and all contributions, including bug fixes, feature requests, and documentation updates.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.
