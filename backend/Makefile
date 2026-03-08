PYTHON=python3
MANAGE=$(PYTHON) manage.py

.PHONY: run migrate makemigrations shell superuser lint lint-fix format test

run:
	$(MANAGE) runserver

migrate:
	$(MANAGE) migrate

makemigrations:
	$(MANAGE) makemigrations

shell:
	$(MANAGE) shell

superuser:
	$(MANAGE) createsuperuser

test:
	$(MANAGE) test

lint:
	ruff check .

lint-fix:
	ruff check . --fix

format:
	black .

check:
	ruff check .
	black --check .
