Member = function(member) {
    this.avatar_url = member.avatar_url;
    this.username = member.login;
    this.url = member.html_url;
}

Member.prototype.getContainer = function(index) {

    return [
        this.memberContent()
    ].join('');
}

Member.prototype.memberContent = function() {
    return [
        '<div class="contri-card">',
        '<a class="contri-url" target="_blank" href="', this.url, '">',
        '<img src="', this.avatar_url, '"/>',
        '<div>', this.username, '</div>',
        '</a>',
        '</div>'
    ].join('');
}
