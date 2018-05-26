import React from 'react';

export default function AuditoriumOptions(props) {
	const {id, name, duration_min} = props.data;

	return (
		<option value={[id, duration_min]}>{name}</option>
	)
}