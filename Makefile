test: node_modules
	npm test

jshint: node_modules/jshint/bin/jshint
	./node_modules/jshint/bin/jshint src/*.js \
		data/src/*.js \
		data/src/**/*.js \
		data/collect-popup/*.js \
		test/*.js

jscs: node_modules/jscs/bin/jscs
	./node_modules/jscs/bin/jscs src/*.js \
		data/src/*.js \
		data/src/**/*.js \
		data/collect-popup/*.js \
		test/*.js

node_modules:
	npm install

node_modules/jshint/bin/jshint:
	npm install jshint --prefix .

node_modules/jscs/bin/jscs:
	npm install jscs --prefix .

clean:
	rm -rf node_modules
