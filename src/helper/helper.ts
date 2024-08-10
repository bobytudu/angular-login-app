export function getLocalUsers() {
    const localUsers = localStorage.getItem('users');
    return localUsers ? JSON.parse(localUsers) : [];
}

export function checkIfEmailExists(email: string) {
    const localUsers = getLocalUsers();
    return localUsers.find((u: any) => u.email === email);
}
export function validateEmailAndPassword(email: string, password: string) {
    const localUsers = getLocalUsers();
    return localUsers.find((u: any) => u.email === email && u.password === password);
}