<script>
  import { loading, error } from "../../stores/auth.js";
  import { apiClient } from "../../utils/api.js";
  import Button from "../common/Button.svelte";
  import Input from "../common/Input.svelte";
  import Alert from "../common/Alert.svelte";
  import Card from "../common/Card.svelte";

  export let onSuccess = () => {};
  export let email = "";

  let step = "email"; // email, otp
  let otp = "";
  let resendTimeout = 0;
  let emailWarning = "";

  const handleRequestOTP = async (e) => {
    e.preventDefault();
    if (!email) {
      error.set("Please enter your email");
      return;
    }

    loading.set(true);
    error.set(null);
    emailWarning = "";

    try {
      const result = await apiClient.post("/auth/request-otp", { email });

      if (result.success) {
        step = "otp";
        error.set(null);
        
        // Check if email was actually sent
        if (!result.data.emailSent && result.data.warning) {
          emailWarning = result.data.warning;
        }
        
        resendTimeout = 60;
        startResendTimer();
      } else {
        error.set(result.message || "Failed to send OTP");
      }
    } catch (err) {
      error.set("Failed to request OTP");
    }

    loading.set(false);
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) {
      error.set("Please enter a valid 6-digit OTP");
      return;
    }

    loading.set(true);
    error.set(null);

    try {
      const result = await apiClient.post("/auth/verify-otp", { email, otp });

      if (result.success) {
        onSuccess({
          token: result.data.token,
          user: result.data.user,
          email,
        });
      } else {
        error.set(result.message || "Invalid OTP");
      }
    } catch (err) {
      error.set("Failed to verify OTP");
    }

    loading.set(false);
  };

  const handleEditEmail = () => {
    step = "email";
    otp = "";
    error.set(null);
  };

  const startResendTimer = () => {
    const interval = setInterval(() => {
      resendTimeout -= 1;
      if (resendTimeout <= 0) {
        clearInterval(interval);
      }
    }, 1000);
  };

  const handleResendOTP = async () => {
    loading.set(true);
    error.set(null);

    try {
      const result = await apiClient.post("/auth/request-otp", { email });

      if (result.success) {
        error.set(null);
        
        // Check if email was actually sent
        if (!result.data.emailSent && result.data.warning) {
          emailWarning = result.data.warning;
        } else {
          emailWarning = "";
        }
        
        resendTimeout = 60;
        startResendTimer();
      } else {
        error.set(result.message || "Failed to resend OTP");
      }
    } catch (err) {
      error.set("Failed to resend OTP");
    }

    loading.set(false);
  };
</script>

<div class="login-container">
  <Card title="Login to One9 Contact">
    {#if $error}
      <Alert message={$error} type="error" />
    {/if}

    {#if step === "email"}
      <form on:submit={handleRequestOTP}>
        <Input
          label="Email Address"
          type="email"
          name="email"
          bind:value={email}
          placeholder="Enter your email"
          required
        />

        <Button
          text={$loading ? "Sending OTP..." : "Send OTP"}
          type="submit"
          disabled={$loading}
          className="btn-login"
        />

        <p
          class="small"
          style="text-align: center; margin-top: 1rem; color: #aaa;"
        >
          We'll send a one-time password to your email
        </p>
      </form>
    {:else if step === "otp"}
      <form on:submit={handleVerifyOTP}>
        <div class="otp-section">
          <p class="medium" style="margin-bottom: 1rem;">
            Enter OTP sent to <strong>{email}</strong>
          </p>

          <button
            type="button"
            on:click={handleEditEmail}
            class="edit-email-btn small"
          >
            Change email
          </button>
        </div>

        {#if emailWarning}
          <Alert message={emailWarning} type="warning" />
        {/if}

        <Input
          label="One-Time Password"
          type="text"
          name="otp"
          bind:value={otp}
          placeholder="000000"
          maxlength="6"
          required
        />

        <Button
          text={$loading ? "Verifying..." : "Verify OTP"}
          type="submit"
          disabled={$loading || otp.length !== 6}
          className="btn-login"
        />

        <div class="resend-section">
          {#if resendTimeout > 0}
            <p class="small" style="text-align: center; color: #aaa;">
              Resend OTP in {resendTimeout}s
            </p>
          {:else}
            <button
              type="button"
              on:click={handleResendOTP}
              disabled={$loading}
              class="resend-btn small"
            >
              Resend OTP
            </button>
          {/if}
        </div>

        <p
          class="small"
          style="text-align: center; margin-top: 1rem; color: #aaa;"
        >
          OTP expires in 10 minutes
        </p>
      </form>
    {/if}
  </Card>
</div>

<style>
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: var(--color-black);
    padding: var(--spacing-md);
  }

  :global(.login-container .card) {
    max-width: 400px;
    width: 100%;
  }

  form {
    display: flex;
    flex-direction: column;
  }

  .otp-section {
    margin-bottom: var(--spacing-lg);
  }

  .edit-email-btn {
    background: none;
    border: none;
    color: var(--color-blue);
    text-decoration: underline;
    cursor: pointer;
    padding: 0;
    font-family: Verdana, sans-serif;
  }

  .edit-email-btn:hover {
    color: var(--color-white);
  }

  .resend-section {
    text-align: center;
    margin-top: var(--spacing-md);
  }

  .resend-btn {
    background: none;
    border: 1px solid var(--color-blue);
    color: var(--color-blue);
    padding: var(--spacing-sm) var(--spacing-md);
    border-radius: 4px;
    cursor: pointer;
    font-family: Verdana, sans-serif;
    font-size: var(--font-small);
    transition: all 0.2s;
  }

  .resend-btn:hover:not(:disabled) {
    background-color: var(--color-blue);
    color: var(--color-white);
  }

  .resend-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  :global(.btn-login) {
    margin-top: var(--spacing-lg);
  }

  @media (max-width: 600px) {
    .login-container {
      padding: var(--spacing-sm);
    }

    :global(.login-container .card) {
      max-width: 100%;
    }
  }
</style>
