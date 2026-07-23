---
company: KM.ON Asia Limited
role: Junior Full Stack Developer
startDate: Jul 2023
endDate: Feb 2025
location: Hong Kong
url: https://karlmayer.com
---

- Built a full-stack **React.js**/**Express.js** energy platform across **AWS** (EU) and **Alibaba Cloud** (China); **Terraform** IaC, **ArgoCD**, **Helm** with custom data-routing layers enforcing **GDPR**/**PIPL** compliance
- Built a two-tier fan-out **Python**/**Lambda**/**FCompute** data pipeline ingesting 1.5 TB of raw IoT logs from **S3**/**OSS** into active relational storage; memory-capped streaming mechanics monitored via **Grafana**/**CloudWatch** eliminating OOM failures
- Deployed and maintained an **AWS RDS Aurora PostgreSQL** cluster extended with **TimescaleDB** hypertables partitioned by telemetry timestamps; handled sustained write throughput of 2,000+ ops/sec while preventing index bloat
- Executed a live production infrastructure migration in **Java 17** from legacy messaging to **Strimzi Kafka** and **Karapace**; authored custom **KafkaConnectors** processing 10M+ messages daily with **DLQ** and inline sink verification for 100% data parity
- Built a **Scala** microservice over **MQTT** to stream bidirectional binary BLOB configurations between APIs and textile machinery; edge command hub with custom exponential back-off loops guaranteeing delivery of KMSF payloads over unstable networks
- Integrated **SBOM** generation and **Trivy** vulnerability scans into **CI/CD** for 15+ microservices; configured automated semantic versioning workflows that parse Git commit hooks to dynamically tag and build **Docker** artifacts
