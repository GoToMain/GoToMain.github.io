DisplayMembers = function(name, member) {
    this.name = name;
    this.members = member || [];
}

DisplayMembers.prototype.addMemberToContainer = function(container, members) {
    members.forEach(function(member, i) {
        container.append(member.getContainer(i + 1));
    });
}
