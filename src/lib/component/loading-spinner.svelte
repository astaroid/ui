<script lang="ts">
    import { Circle2 } from "svelte-loading-spinners"

    export let size:number = 70
</script>
<Circle2 
    colorCenter="#06c694" 
    colorInner="#06aa81" 
    colorOuter="#06e0a7" 
    unit="px" 
    size={size} 
/>
