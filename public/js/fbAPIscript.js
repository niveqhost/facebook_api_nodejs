// @ts-nocheck
window.fbAsyncInit = function () {
    FB.init({
        appId: '1590141388041736',
        cookie: true,
        xfbml: true,
        version: 'v10.0'
    });

    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });
};

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function statusChangeCallback(response) {
    if (response.status == 'connected') {
        console.log('Đã đăng nhập');
        getInfo();
        setElements(true);
    } else {
        console.log("Chưa đăng nhập");
        setElements(false);
    }
}

function checkLoginState() {
    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });
}

function getInfo() {
    FB.api('/me?fields=name,email', function (response) {
        if (response && !response.error) {
            buildProfile(response);
        }

        FB.api('/me/feed', function (response) {
            if (response && !response.error) {
                buildFeed(response);
            }
        });
    });
}

function buildProfile(user) {
    let profile = `
        <h3>${user.name}</h3>
        <ul class="list-group">
            <li class="list-group-item">ID người dùng: ${user.id}</li>
            <li class="list-group-item">Email: ${user.email}</li>
        </ul>
    `;
    document.getElementById('profile').innerHTML = profile;
}

function buildFeed(feed) {
    let output = '<h3>Latest Posts</h3>';
    for (let i in feed.data) {
        if (feed.data[i].message) {
            output += `
                <div class="well">
                    ${feed.data[i].message} <span>${feed.data[i].created_time}</span>
                </div>
            `;
        }
    }
    document.getElementById('feed').innerHTML = output;
}

function setElements(isLoggedIn) {
    if (isLoggedIn) {
        document.getElementById('profile').style.display = "block";
        document.getElementById('logout').style.display = "block";
        document.getElementById('btn-like').style.display = "block";
        document.getElementById('comment-section').style.display = "block";
        document.getElementById('fb-btn').style.display = "none";
        document.getElementById('heading').style.display = "none";
    } else {
        document.getElementById('btn-like').style.display = "none";
        document.getElementById('comment-section').style.display = "none";
        document.getElementById('profile').style.display = "none";
        document.getElementById('logout').style.display = "none";
        document.getElementById('fb-btn').style.display = "block";
        document.getElementById('heading').style.display = "block";
    }
}

function logout() {
    FB.logout(function (response) {
        setElements(false);
    });
}