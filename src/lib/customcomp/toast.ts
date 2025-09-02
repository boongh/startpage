import { toast } from "svelte-sonner"


export function PushToast(
	Header: string = "",
	Content: string = "",
	type: string = "default",
	actions?: any,
	actionLabel?: string
) {
	
	const content = {
		description: Content,
		actions : actions ? {
			label: actionLabel,
			onClick: () => { actions() }
		} : undefined
	}
	
	switch (type) {
		case "default":
			toast(Header, content)
			break;
		case "success":
			toast.success(Header, content)
			break;
		case "warning":
			toast.warning(Header, content)
			break;
		case "info":
			toast.info(Header, content)
			break;
		case "error":
			toast.error(Header, content)
			break;

	}
}