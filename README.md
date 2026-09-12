# Timequip task link

Adds a non-blocking GitHub Actions summary for Timequip task keys in pull requests.

```yaml
permissions:
  pull-requests: read
jobs:
  timequip:
    runs-on: ubuntu-latest
    steps:
      - uses: timequip/task-link-action@v1
        with:
          project-key: ACME
```

The action never fails a pull request. Publish a tagged release from this public repository to list it in GitHub Marketplace.

[Timequip task tracker](https://timequip.com)
