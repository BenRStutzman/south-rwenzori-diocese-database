export const userRole = {
    viewer: 'Viewer',
    contributor: 'Contributor',
    editor: 'Editor',
    administrator: 'Administrator',
}

export const atLeast = {
    viewer: [userRole.viewer, userRole.contributor, userRole.editor, userRole.administrator],
    contributor: [userRole.contributor, userRole.editor, userRole.administrator],
    editor: [userRole.editor, userRole.administrator],
    administrator: [userRole.administrator],
}