export function shouldNotSubmitForm(values) {
	return Object.values(values).some((value) => !value);
}
