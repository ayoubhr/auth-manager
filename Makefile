up-dev:
			docker-compose -f docker-compose.yml up -d

up-prod:
			docker-compose -f docker-compose.prod.yml up -d

down:
			docker-compose down