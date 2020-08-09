Organization = function(name, repos) {
    this.name = name;
    this.repos = repos || [];
}

Organization.prototype.totalForks = function() {
    total = 0;

    this.repos.forEach(function(repo) {
        total += repo.forks;
    });

    return total;
}

Organization.prototype.totalWatchers = function() {
    total = 0;

    this.repos.forEach(function(repo) {
        total += repo.watchers;
    });

    return total;
}

Organization.prototype.license = function() {
    total = 0;
    return license;
}

Organization.prototype.forkedCount = function() {
    total = 0;

    this.repos.forEach(function(repo) {
        if (repo.fork) {
            total += 1;
        }
    });
    return total;
}

Organization.prototype.starCount = function() {
    total = 0;
    this.repos.forEach(function(repo) {
        total += repo.star;
    });

    return total;
}

Organization.prototype.notForkedCount = function() {
    total = 0;
    this.repos.forEach(function(repo) {
        if (!repo.fork) {
            total += 1;
        }
    });

    return total;
}

Organization.prototype.featuredRepos = function() {
    featured = [];
    this.repos.forEach(function(repo) {
        if (repo.featured() && !repo.fork) {
            if (repo.position()) {
                featured[repo.position() - 1] = repo
            } else {
                featured.push(repo);
            }
        }
    });

    return featured;
}

Organization.prototype.deprecatedRepos = function() {
    deprecated = [];
    this.repos.forEach(function(repo) {
        if (repo.deprecated() && !repo.fork) {
            deprecated.push(repo);
        }
    });

    return deprecated;
}


Organization.prototype.forkedRepos = function() {
    forked = [];
    this.repos.forEach(function(repo) {
        if (repo.fork) {
            forked.push(repo);
        }
    });

    return forked;
}

Organization.prototype.regularRepos = function() {
    regular = [];
    this.repos.forEach(function(repo) {
        if (!repo.fork && !repo.featured() && !repo.deprecated()) {
            regular.push(repo);
        }
    });

    return regular;
}

Organization.prototype.addReposToContainer = function(container, repos) {

    let array = []
    repos.forEach(function(repo, i) {
        array.push(repo.getContainer(i + 1));
    });
    for (let index = 0; index < array.length; index += 2) {
        container.append(daba(array[index], array[index + 1]));
    }

}

function daba(s1, s2) {
    console.log(s2);
    if (s2 == undefined) {
        return [
            '<div class="break">',
            s1,
            '<div class="island-item" style="border: none;"></div>',
            '</div>'
        ].join('');
    }
    return [
        '<div class="break">',
        s1,
        s2,
        '</div>'
    ].join('');
}
