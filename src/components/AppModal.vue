<template>
    <div class="modal fade show d-block" id="contacts-modal" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "AppModal"
};

</script>