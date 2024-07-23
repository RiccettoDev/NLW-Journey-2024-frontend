import { MapPin, Calendar, ArrowRight, UserRoundPlus, Settings2, X, AtSign, Plus, User, Mail } from 'lucide-react'
import { FormEvent, useState } from 'react'

export function CreateTripPage() {
  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false)
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false)
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false)

  const [emailsToInvite, setEmailsToInvite] = useState([
    'eduriccetto23@gmail.com'
  ])

  function openGuestsInput() {
    setIsGuestsInputOpen(true)
  }

  function closeGuestsInput() {
    setIsGuestsInputOpen(false)
  }
  function openConfirmTripModal() {
    setIsConfirmTripModalOpen(true)
  }

  function closeConfirmTripModal() {
    setIsConfirmTripModalOpen(false)
  }

  function openGuestsModal() {
    setIsGuestsModalOpen(true)
  }

  function closeGuestsModal() {
    setIsGuestsModalOpen(false)
  }

  function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const email = data.get('email')?.toString()

    if (!email) {
      return
    }

    if (emailsToInvite.includes(email)) {
      event.currentTarget.reset()
      return
    }

    setEmailsToInvite([...emailsToInvite, email])

    event.currentTarget.reset()
  }

  function removeEmailsFromInvites(emailToRemove: string) {
    const newEmailList = emailsToInvite.filter(email => email !== emailToRemove)
    setEmailsToInvite(newEmailList)
  }

  return (
    <div className="w-full h-screen flex items-center justify-center bg-pattern">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className='flex flex-col items-center gap-3'>
          <img src="/logo.png" alt="logo plann.er" />
          <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua próxima viagem!</p>
        </div>

        <div className='space-y-4'>
          <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
            <div className='flex items-center gap-2 flex-1'>
              <MapPin className='size-5 text-zinc-400' />
              <input
                disabled={isGuestsInputOpen}
                type="text"
                placeholder="Para onde você vai?"
                className="bg-transparent text-lg placeholder-zinc-400 outline-none"
              />
            </div>
            <div className='flex items-center gap-2'>
              <Calendar className='size-5 text-zinc-400' />
              <input
                disabled={isGuestsInputOpen}
                type="text"
                placeholder="Quando?"
                className="bg-transparent text-lg placeholder-zinc-400 outline-none w-36"
              />
            </div>
            <div className='w-px h-6 bg-zinc-800 p-0.5' />
            {isGuestsInputOpen ? (
              <button
                onClick={closeGuestsInput}
                className='bg-zinc-800 text-zinc-200 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-zinc-700'>
                Alterar local/data
                <Settings2 className='size-5 text-zinc-400' />
              </button>
            ) : (
              <button
                onClick={openGuestsInput}
                className='bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400'
              >
                Continuar
                <ArrowRight className='size-5' />
              </button>
            )}
          </div>

          {isGuestsInputOpen && (
            <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
              <button
                type='button'
                onClick={openGuestsModal}
                className='flex items-center gap-2 flex-1 text-left'
              >
                <UserRoundPlus className='size-5 text-zinc-400' />
                {emailsToInvite.length > 0 ? (
                  <span className='text-zinc-100 text-lg flex'>
                    {emailsToInvite.length} pessoa(s) convidada(s)
                  </span>
                ) : (
                  <span className='text-zinc-400 text-lg flex'>Quem estará na viagem?</span>
                )}
              </button>
              <div className='w-px h-6 bg-zinc-800 p-0.5' />
              <button
                onClick={openConfirmTripModal}
                className='bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400'
              >
                Confirmar Viagem
                <ArrowRight className='size-5' />
              </button>
            </div>
          )}
        </div>

        <p className="text-sm text-zinc-500">
          Ao planejar sua viagem pela plann.er você automaticamente concorda <br /> com nossos <a className="text-zinc-300 underline" href="#">termos de uso</a> e <a className="text-zinc-300 underline" href="#">políticas de privacidade.</a>
        </p>
      </div>
      {isGuestsModalOpen && (
        <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
          <div className='w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5'>
            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <h2 className='text-lg font-semibold'>Selecionar convidados</h2>
                <button type='button' onClick={closeGuestsModal}>
                  <X className='size-5 text-zinc-400' />
                </button>
              </div>
              <p className='text-sm text-zinc-400'>
                Os convidados irão receber e-mails para confirmar a participação na viagem.
              </p>
            </div>
            <div className='flex flex-wrap gap-2'>
              {emailsToInvite.map(email => {
                return (
                  <div key={email} className='py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2'>
                    <span className='text-zinc-300'>{email}</span>
                    <button type='button' onClick={() => removeEmailsFromInvites(email)}>
                      <X className='size-4 text-zinc-400' />
                    </button>
                  </div>
                )
              })}
            </div>
            <div className='w-full h-px bg-zinc-800' />
            <form
              onSubmit={addNewEmailToInvite}
              className='p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center justify-between gap-2'
            >
              <div className='flex items-center gap-2'>
                <AtSign className='size-5 text-zinc-400' />
                <input
                  type="email"
                  name='email'
                  placeholder="Digite o e-mail do convidado"
                  className="bg-transparent text-lg placeholder-zinc-400 outline-none"
                />
              </div>
              <button
                type='submit'
                className='bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400'
              >
                Convidar
                <Plus className='size-5 text-lime-800' />
              </button>
            </form>
          </div>
        </div>
      )}

      {isConfirmTripModalOpen && (
        <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
          <div className='w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5'>
            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <h2 className='text-lg font-semibold'>Confirmar criação de viagem</h2>
                <button type='button' onClick={closeConfirmTripModal}>
                  <X className='size-5 text-zinc-400' />
                </button>
              </div>
              <p className='text-sm text-zinc-400'>
                Para concluir a criação da viagem para <span className='text-zinc-100 font-semibold'>Floripa</span> nas datas de <span className='text-zinc-100 font-semibold'>16 a 27 de agosto de 2024</span> preencha seus dados abaixo:
              </p>
            </div>
            <form
              onSubmit={addNewEmailToInvite}
              className='space-y-3'
            >
              <div className='h-14 px-5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>
                <User className='size-5 text-zinc-400' />
                <input
                  name='name'
                  placeholder="Digite o seu nome completo"
                  className="bg-transparent text-lg placeholder-zinc-400 outline-none"
                />
              </div>
              <div className='h-14 px-5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>
                <Mail className='size-5 text-zinc-400' />
                <input
                  type="email"
                  name='email'
                  placeholder="Digite o seu e-mail pessoal"
                  className="bg-transparent text-lg placeholder-zinc-400 outline-none"
                />
              </div>
              <button
                type='submit'
                className='w-full justify-center bg-lime-300 text-lime-950 rounded-lg px-5 h-11 font-medium flex items-center gap-2 hover:bg-lime-400'
              >
                Confirmar criação da viagem.
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}