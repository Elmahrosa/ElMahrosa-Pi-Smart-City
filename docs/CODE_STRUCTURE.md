ElMahrosa-Pi-Smart-City/
├── backend/
│   ├── services/                          # Microservices by domain
│   │   ├── auth-service/
│   │   │   ├── src/
│   │   │   │   ├── controllers/
│   │   │   │   │   └── authController.ts
│   │   │   │   ├── models/
│   │   │   │   │   └── userModel.ts
│   │   │   │   ├── routes/
│   │   │   │   │   └── authRoutes.ts
│   │   │   │   ├── services/
│   │   │   │   │   └── authService.ts
│   │   │   │   ├── middlewares/
│   │   │   │   │   └── authMiddleware.ts
│   │   │   │   └── utils/
│   │   │   │       └── logger.ts
│   │   │   ├── tests/
│   │   │   │   └── authService.test.ts
│   │   │   ├── Dockerfile
│   │   │   ├── package.json
│   │   │   ├── tsconfig.json
│   │   │   └── README.md
│   │   ├── crowdfunding-service/
│   │   │   ├── src/
│   │   │   │   ├── controllers/
│   │   │   │   │   └── crowdfundingController.ts
│   │   │   │   ├── models/
│   │   │   │   │   └── projectModel.ts
│   │   │   │   ├── routes/
│   │   │   │   │   └── crowdfundingRoutes.ts
│   │   │   │   ├── services/
│   │   │   │   │   └── crowdfundingService.ts
│   │   │   │   └── utils/
│   │   │   │       └── validator.ts
│   │   │   ├── tests/
│   │   │   │   └── crowdfundingService.test.ts
│   │   │   ├── Dockerfile
│   │   │   ├── package.json
│   │   │   ├── tsconfig.json
│   │   │   └── README.md
│   │   ├── transaction-service/
│   │   │   ├── src/
│   │   │   │   ├── controllers/
│   │   │   │   │   └── transactionController.ts
│   │   │   │   ├── models/
│   │   │   │   │   └── transactionModel.ts
│   │   │   │   ├── routes/
│   │   │   │   │   └── transactionRoutes.ts
│   │   │   │   ├── services/
│   │   │   │   │   └── transactionService.ts
│   │   │   │   └── utils/
│   │   │   │       └── formatter.ts
│   │   │   ├── tests/
│   │   │   │   └── transactionService.test.ts
│   │   │   ├── Dockerfile
│   │   │   ├── package.json
│   │   │   ├── tsconfig.json
│   │   │   └── README.md
│   │   ├── data-analytics-service/
│   │   │   ├── src/
│   │   │   │   ├── models/
│   │   │   │   │   └── analyticsModel.ts
│   │   │   │   ├── services/
│   │   │   │   │   └── analyticsService.ts
│   │   │   │   └── utils/
│   │   │   │       └── dataProcessor.ts
│   │   │   ├── tests/
│   │   │   │   └── analyticsService.test.ts
│   │   │   ├── Dockerfile
│   │   │   ├── package.json
│   │   │   ├── tsconfig.json
│   │   │   └── README.md
│   │   ├── web3-service/                     # New Web3 service for blockchain interactions
│   │   │   ├── src/
│   │   │   │   ├── controllers/
│   │   │   │   │   └── web3Controller.ts
│   │   │   │   ├── models/
│   │   │   │   │   └── transactionModel.ts
│   │   │   │   ├── routes/
│   │   │   │   │   └── web3Routes.ts
│   │   │   │   ├── services/
│   │   │   │   │   └── web3Service.ts
│   │   │   │   └── utils/
│   │   │   │       └── web3Utils.ts
│   │   │   ├── tests/
│   │   │   │   └── web3Service.test.ts
│   │   │   ├── Dockerfile
│   │   │   ├── package.json
│   │   │   ├── tsconfig.json
│   │   │   └── README.md
│   ├── api-gateway/
│   │   ├── src/
│   │   │   ├── graphql/
│   │   │   │   └── resolvers/
│   │   │   │       └── authResolver.ts
│   │   │   ├── rest/
│   │   │   │   └── apiRoutes.ts
│   │   │   ├── web3/
│   │   │   │   └── web3Routes.ts            # New routes for Web3 interactions
│   │   │   └── middleware/
│   │   │       └── errorHandler.ts
│   │   ├── Dockerfile
│   │   ├── package.json
│   │   └── README.md
│   ├── shared-libs/
│   │   ├── logger/
│   │   │   └── logger.ts
│   │   ├── constants/
│   │   │   └── appConstants.ts
│   │   └── utils/
│   │       └── responseFormatter.ts
│   ├── deployments/
│   │   ├── base/
│   │   │   ├── auth-service-deployment.yaml
│   │   │   ├── crowdfunding-service-deployment.yaml
│   │   │   ├── transaction-service-deployment.yaml
│   │   │   └── web3-service-deployment.yaml  # Deployment for Web3 service
│   │   └── overlays/
│   │       ├── production/
│   │       │   └── production-values.yaml
│   │       └── staging/
│   │           └── staging-values.yaml
│   └── README.md
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   └── manifest.json
│   ├── src/
│   │   ├── assets/
│   │   │   ├── images/
│   │   │   └── styles/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   └── Navbar.tsx
│   │   │   ├── charts/
│   │   │   │   └── PieChart.tsx
│   │   │   └── wallet/
│   │   │       └── WalletIntegration.tsx
│   │   ├── contexts/
│   │   │   └── AuthContext.tsx
│   │   ├── hooks/
│   │   │   └── useFetch.ts
│   │   ├── pages/
│   │   │   ├── Dashboard/
│   │   │   │   └── Dashboard.tsx
│   │   │   ├── Crowdfunding/
│   │   │   │   └── Crowdfunding.tsx
│   │   │   ├── Governance/
│   │   │   │   └── Governance.tsx
│   │   │   ├── Transactions/
│   │   │   │   └── Transactions.tsx
│   │   │   ├── Profile/
│   │   │   │   └── Profile.tsx
│   │   │   └── Settings.tsx
│   │   ├── services/
│   │   │   ├── apiClient.ts
│   │   │   ├── blockchainService.ts
│   │   │   └── web3Service.ts                # New service for Web3 interactions
│   │   ├── i18n/
│   │   │   └── en.json
│   │   ├── utils/
│   │   │   └── validators.ts
│   │   ├── App.tsx
│   │   ├── index.tsx
│   │   ├── styles.ts
│   │   └── tests/
│   │       └── App.test.tsx
│   ├── cypress/
│   │   ├── integration/
│   │   │   └── app.spec.ts
│   │   └── support/
│   │       └── commands.ts
│   ├── Dockerfile
│   ├── package.json
│   └── README.md
├── smart-contracts/
│   ├── contracts/
│   │   ├── Crowdfunding.sol
│   │   ├── Governance.sol
│   │   ├── PiTransaction.sol
│   │   └── Token.sol
│   ├── scripts/
│   │   ├── deploy.ts
│   │   └── verify.ts
│   ├── tests/
│   │   ├── crowdfunding.test.ts
│   │   ├── governance.test.ts
│   │   └── transaction.test.ts
│   ├── artifacts/
│   ├── hardhat.config.ts
│   └── README.md
├── iot/
│   ├── devices/
│   │   ├── air-quality-sensor/
│   │   │   ├── firmware/
│   │   │   │   └── main.py
│   │   │   ├── data-collector/
│   │   │   │   └── dataCollector.py
│   │   │   └── README.md
│   │   ├── energy-meter/
│   │   │   ├── firmware/
│   │   │   │   └── main.py
│   │   │   ├── mqtt-client/
│   │   │   │   └── mqttClient.py
│   │   │   └── README.md
│   ├── gateways/
│   │   ├── mqtt-broker-config/
│   │   │   └── config.yaml
│   │   ├── edge-processing/
│   │   │   └── edgeProcessor.py
│   │   └── README.md
│   ├── data-pipelines/
│   │   ├── ingestion/
│   │   │   └── ingestionPipeline.py
│   │   ├── processing/
│   │   │   └── processingPipeline.py
│   │   └── storage/
│   │       └── storageService.py
│   └── README.md
├── data-lake/
│   ├── raw/
│   │   └── rawData/
│   ├── processed/
│   │   └── processedData/
│   ├── models/
│   │   ├── ai/
│   │   │   └── model.py
│   │   └── analytics/
│   │       └── analyticsModel.py
│   ├── notebooks/
│   │   └── analysis.ipynb
│   ├── pipelines/
│   │   └── dataPipeline.py
│   └── README.md
├── cicd/
│   ├── workflows/
│   │   ├── backend-ci.yml
│   │   ├── frontend-ci.yml
│   │   ├── contracts-ci.yml
│   │   └── iot-ci.yml
│   ├── helm-charts/
│   │   └── chart.yaml
│   ├── terraform/
│   │   └── main.tf
│   └── README.md
├── monitoring/
│   ├── prometheus/
│   │   └── prometheus.yml
│   ├── grafana/
│   │   └── dashboards/
│   ├── alertmanager/
│   │   └── alertmanager.yml
│   ├── dashboards/
│   │   └── dashboard.json
│   └── README.md
├── security/
│   ├── audits/
│   │   └── audit-report.md
│   ├── pen-tests/
│   │   └── pentest-report.md
│   ├── policies/
│   │   └── security-policy.md
│   ├── vulnerability-scans/
│   │   └── scan-report.md
│   └── README.md
├── scripts/
│   ├── deploy/
│   │   └── deploy.sh
│   ├── maintenance/
│   │   └── maintenance.sh
│   ├── data-migration/
│   │   └── migrateData.sh
│   ├── utils/
│   │   └── utilityFunctions.sh
│   └── README.md
├── config/
│   ├── environments/
│   │   ├── development.env
│   │   ├── staging.env
│   │   └── production.env
│   ├── docker/
│   │   └── docker-compose.yml
│   ├── kubernetes/
│   │   └── k8s-config.yaml
│   ├── nginx/
│   │   └── nginx.conf
│   └── README.md
├── docs/
│   ├── architecture.md
│   ├── api-specification.md
│   ├── user-guide.md
│   ├── smart-contracts.md
│   ├── iot-system-design.md
│   ├── data-governance.md
│   ├── contributor-guide.md
│   ├── roadmap.md
│   └── glossary.md
├── tests/
│   ├── integration/
│   │   └── integrationTests.spec.ts
│   ├── unit/
│   │   └── unitTests.spec.ts
│   ├── e2e/
│   │   └── e2eTests.spec.ts
│   ├── performance/
│   │   └── performanceTests.spec.ts
│   └── README.md
├── .gitignore
├── LICENSE
├── README.md
└── docker-compose.yml
