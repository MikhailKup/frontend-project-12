lint-frontend:
	cd frontend && npx eslint .

lint:
	npx eslint .

install:
	npm install

start-frontend:
	cd frontend && npm start

start-backend:
	npm start

start:
	make start-backend & make start-frontend

build:
	rm frontend/build -rf
	npm run build