<template>
    <div class="card">
        <div class="list-group list-group-flush">
            <router-link to="/home/addpost" class="list-group-item list-group-item-action p-3">
                <font-awesome-icon class="bars me-2" icon="fas fa-plus"/>
                張貼動態
            </router-link>
            <router-link to="/home/profile" class="list-group-item list-group-item-action p-3">
                <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="mdo" width="32" height="32" class="rounded-circle me-2">
                <span>User</span>
            </router-link>
            <a class="list-group-item list-group-item-action p-3">
                <font-awesome-icon class="bars me-2" icon="fas fa-bell"/>
                <span>追蹤名單</span>
            </a>
            <a class="list-group-item list-group-item-action p-3">
                <font-awesome-icon class="bars me-2" icon="fas fa-thumbs-up"/>
                <span>我按讚的文章</span>
            </a>
        </div>
    </div>
</template>

<script>
</script>
