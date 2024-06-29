import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabase = createClient('https://dlnuhxjjmpneznrxihtw.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsbnVoeGpqbXBuZXpucnhpaHR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk2Njg3MTksImV4cCI6MjAzNTI0NDcxOX0.bNI6pyjVHRF2pdUhhaXeY99ewe44314Grl9vgYmV5G0')

const { data, error } = await supabase
  .from('aboba')
  .select('*')

console.log(data)


var chat_messages = document.getElementById("chat_messages");


// Добавляем каждое сообщение в chat_messages
data.forEach(message => {
    chat_messages.innerHTML += `
        <span class="msg">
            <span class="text">${message.message}</span>
            <strong class="user_name">- ${message.user_name}</strong>
        </span>
    `
});


const send_message = document.getElementById("send_message");

send_message.onclick = async function() {
    const user_name = document.getElementById("user_name");
    const input_message = document.getElementById("input_message");
    
    const { data, error } = await supabase
        .from('aboba')
        .insert({ message: input_message.value, user_name: user_name.value })
}


supabase
  .channel('room1')
  .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'aboba' }, payload => {
    data.forEach(message => {
        chat_messages.innerHTML += `
            <span class="msg">
                <span class="text">${payload.new.message}</span>
                <strong class="user_name">- ${payload.new.user_name}</strong>
            </span>
        `
    });
  })
  .subscribe()