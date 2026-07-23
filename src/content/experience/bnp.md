---
company: BNP Paribas CIB
role: IT Strategist (Contract)
startDate: Feb 2021
endDate: Aug 2021
location: Hong Kong
---

- Built a distributed fan-out data replication engine in Python that routes payloads based on live server latencies and node clustering; bypassed GIL limitations via multiprocessing to synchronize terabyte-scale log data across 200+ nodes
- Designed a Kafka/Elasticsearch ingestion pipeline for sub-second dashboard refreshes on high-cardinality trading logs; optimized cluster indexing strategies
- Developed automated shell scripts and platform workflows enforcing the mandatory Four-Eyes Principle; configured multi-party approval validation for staging-to-production deployments with programmatic systemd health checks
- Optimized a multi-threaded C++ packet replay engine processing .pcap histories into trading systems; resolved thread-synchronization bottlenecks by replacing blocking loops with non-blocking condition variables
