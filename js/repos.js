Repository = function(repo) {
    // attributes
    this.name = repo.name;
    this.language = repo.language;
    this.url = repo.html_url;
    this.description = repo.description;
    this.fork = repo.fork;
    this.watchers = repo.watchers;
    this.forks = repo.forks;
    this.license = repo.license.spdx_id;
    this.stars = repo.stargazers_count;
}

Repository.prototype.blogPost = function() {
    if (oss_projects[this.name] && oss_projects[this.name].blog_post) {
        return oss_projects[this.name].blog_post;
    }
}

Repository.prototype.featured = function() {
    return oss_projects[this.name] && oss_projects[this.name].featured;
}

Repository.prototype.deprecated = function() {
    return oss_projects[this.name] && oss_projects[this.name].deprecated;
}

Repository.prototype.position = function() {
    if (oss_projects[this.name] && oss_projects[this.name].position) {
        return oss_projects[this.name].position;
    }
}

Repository.prototype.logo = function() {
    if (oss_projects[this.name] && oss_projects[this.name].logo) {
        return oss_projects[this.name].logo;
    }
}

Repository.prototype.background = function() {
    if (oss_projects[this.name] && oss_projects[this.name].background) {
        return oss_projects[this.name].background;
    }
}

Repository.prototype.classes = function() {
    if (this.featured()) {
        return 'featured-project';
    } else if (this.deprecated()) {
        return 'deprecated-project';
    }
}

Repository.prototype.getBlogLink = function() {
    if (this.blogPost()) {
        return '<a href="' + this.blogPost() + '" target="_blank"><span class="octicon octicon-file-text"></span> Blog post</a> ';
    }
}

Repository.prototype.getContainer = function(index) {
    return [
        this.repoContent(),
    ].join('');
}

Repository.prototype.featuredImage = function() {
    if (this.featured()) {
        return [
            '<div class="island-item featured-image">',
            '<img src="/img/', this.background(), '">',
            '</div>'
        ].join('');
    }
}

Repository.prototype.headerLogo = function() {
    if (this.logo()) {
        return '<img src="/img/' + this.logo() + '" height="21px" width="26px" class="logo"> ';
    }
}

Repository.prototype.repoContent = function() {
    return [
        '<div class="island-item">',
        '<div class="repo-head">',
        '<h3>',
        '<a href="', this.url, '" target="_blank" class="repo-h">', this.name, '</a>',
        '</h3>',
        '<p>', this.description, '</p>',
        '<div class="repo-info">',

        '<span style="margin-left: 0;"><i class="far fa-star"></i> ', this.stars, '</span> ',
        '<span><i class="fas fa-code-branch"></i> ', this.forks, '</span> ',
        '<span class="language ', this.language, '"><i class="fas fa-circle"></i> ', this.language, '</span>',
        '<span style="margin-left:15px"><i class="fas fa-balance-scale"></i> ', this.license, '</span> ',
        '</div>',
        '</div>',
        '</div>'
    ].join('');
}

Repository.prototype.bottomLinks = function() {
    if (this.blogPost()) {
        return [
            '</div>',
            '<div class="break">'
        ].join('');
    }
}
