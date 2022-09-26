function clear(table, tbody) {
  if (table === 'users') {
    tbody.innerHTML = ` <tbody class="mt-1" id="users-tbody"></tbody>`
  } else if (table === 'importacoes') {
    tbody.innerHTML = `
        <tbody class="mt-5 fw-regular fs-5" id="tbody"></tbody>`
  }
}

export { clear }
