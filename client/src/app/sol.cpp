#include <iostream>
using namespace std;

int solve() {
    int n, solved = 0;
    cin >> n;

    while (n--) {
        int a, b, c;
        cin >> a >> b >> c;
        if (a + b + c >= 2)
            solved++;
    }

    return solved;
}

int main() {
    auto result = solve();
    cout << result << endl;
    return 0;
}