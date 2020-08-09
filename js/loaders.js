function getAllPages(urlPrefix, callback, page, results) {
    page = page || 1;
    results = results || [];

    var url = urlPrefix + '?per_page=100&page=' + parseInt(page);

    $.get(url, function(data) {
        if (data.length > 0) {
            data.forEach(function(resultDatum) {
                results.push(resultDatum);
            });
            getAllPages(urlPrefix, callback, page + 1, results);
        } else {
            callback(results);
        }
    });
}

function getGithubRepos(callback, page, repos) {
    getAllPages('https://api.github.com/users/GoToMain/repos', callback);
}

function getGithubMembers(callback) {
    getAllPages('https://api.github.com/orgs/GoToMain/members', callback);
}

function loadRepositoryData(repoData) {
    var org = new Organization('GoToMain');
    org.repos = [];

    repoData.forEach(function(repoDatum) {
        org.repos.push(new Repository(repoDatum));
    });

    $('.projects .featured').empty();
    $('.projects .not-featured').empty();

    org.addReposToContainer($('.projects .featured'), org.featuredRepos());
    org.addReposToContainer($('.projects .not-featured'), org.regularRepos());

    $('.project-count').html(org.forkedCount());
}

function loadMemberData(members) {
    var disMember = new DisplayMembers('GoToMain');
    disMember.members = [];

    $('.contributors').empty();

    members.forEach(function(member) {
        disMember.members.push(new Member(member));
    });

    disMember.addMemberToContainer($('.contributors'), disMember.members);
}

$(document).ready(function() {
    getGithubRepos(loadRepositoryData);
    getGithubMembers(loadMemberData);
});
