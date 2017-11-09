test: node_modules
	npm test

node_modules:
	npm install

clean:
	rm -rf node_modules
