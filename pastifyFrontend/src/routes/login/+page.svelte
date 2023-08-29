<script>
    import {goto} from '$app/navigation';
    import { Button } from "$lib/components/ui/button";
    import * as Card from "$lib/components/ui/card";
    import * as Select from "$lib/components/ui/select";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
    import { onMount, onDestroy } from 'svelte';

    let username = '';
    let password = '';
    let currentError = '';

    const frameworks = [
        {
            value: "sveltekit",
            label: "SvelteKit"
        },
        {
            value: "next",
            label: "Next.js"
        },
        {
            value: "astro",
            label: "Astro"
        },
        {
            value: "nuxt",
            label: "Nuxt.js"
        }
    ];

    onMount(() => {
        const handleClickOutside = (event) => {
            if (!document.querySelector('div.w-[350px]').contains(event.target)) {
                console.log('Clicked outside');
            }
        };

        document.addEventListener('click', handleClickOutside);

        onDestroy(() => {
            document.removeEventListener('click', handleClickOutside);
        });
    });

     const cancel = () => {
        goto('/');
    };


     async function validateLogin() {
        login()
    }

    const login = () => {
        fetch('http://localhost:3001/user/authenticate', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            })
        })
          .then((res) => {
              return res.json();
          })
          .then((data) => {
              console.log(data);
              if (data.error === true) throw new Error(data.message);

              // Save the user ID in sessionStorage
              sessionStorage.setItem('userID', data.id.toString());

              return true;  // Return a value to indicate success
          })
          .then(async (success) => {
              if (success) {
                  await goto('/', {noScroll: false, replaceState: true});
              }
          })
          .catch((error) => {
              currentError = error;
              console.log("Error logging in", error);
          });
    }
</script>

<div class="flex justify-center items-center min-h-screen">
    <Card.Root class="w-[350px]">
        <Card.Header>
            <Card.Title>Login</Card.Title>
            <Card.Description>Login to Pastify</Card.Description>
        </Card.Header>

        <Card.Content>
            <form>
                <div class="grid w-full items-center gap-4">
                    <div class="flex flex-col space-y-1.5">
                        <Label for="username">Username</Label>
                        <Input bind:value={username} id="username" placeholder="Username" />
                    </div>
                    <div class="flex flex-col space-y-1.5">
                        <Label for="password">Password</Label>
                        <Input bind:value={password} id="password" placeholder="Password" />
                    </div>
                </div>
            </form>
        </Card.Content>
        <Card.Footer class="flex justify-between">
            <Button variant="outline" on:click={cancel}>Cancel</Button>
            <Button on:click={validateLogin}>Login</Button>
        </Card.Footer>
    </Card.Root>
</div>
