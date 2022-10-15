import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Header, RepositoryInfo, Issues } from './styles';
import logoImg from '../../assets/logo.svg';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import api from '../../services/api'


interface Repository {
    full_name: string;
    description: string;
    stargazers_count: number,
    forks_count: number,
    open_issues_count: number,
    owner: {
        login: string;
        avatar_url: string;
    };
}

interface Issue {
    id: number,
    title: string;
    html_url: string;
    user: {
        login: string;
    }
}

const Repository = () => {
    const { owner, repository:nameRepository } = useParams();
    const repository = `${owner}/${nameRepository}`

    const [repositoryValue, setRepositoryValue] = useState<Repository | null>(null)
    const [issues, setIssues] = useState<Issue[]>([])

    useEffect(()=>{
        //EXEMPLO DE CHAMADA VIA PROMISE -> EXECUTA AS DUAS CHAMADAS AO MESMO TEMPO
        // api.get(`repos/${repository}`)
        //     .then(response => {
        //         console.log(response.data)
        //     })
        // api.get(`repos/${repository}/issues`)
        //     .then(response => {
        //         console.log(response.data)
        //     })

        //EXEMPLO DE CHAMADA VIA ASYNC/AWAIT
        async function loadData(): Promise<void>{
            //PRIMEIRA ALTERNATIVA -> EXECUTA AS DUAS CHAMADAS EM ORDEM SEQUENCIAL
            //const repositoryLoad = await  api.get(`repos/${repository}`)
            //const issuesLoad = await  api.get(`repos/${repository}/issues`)
            //FIM PRIMEIRA ALTERNATIVA

            //SEGUNDA ALTERNATIVA -> EXECUTA AS DUAS CHAMADAS AO MESMO TEMPO
            const [repositoryLoad, issuesLoad] = await Promise.all([
                api.get(`repos/${repository}`),
                api.get(`repos/${repository}/issues`)
            ])
            //FIM PRIMEIRA ALTERNATIVA
            setRepositoryValue(repositoryLoad.data)
            setIssues(issuesLoad.data)
        }
        loadData()
    }, [repository])



    return (
        <>
            <Header>
                <img src={logoImg} alt="Github Explorer" />
                <Link to="/github-react-project/">
                    <FiChevronLeft size={16} />
                    Voltar
                </Link>
            </Header>

            {repositoryValue && (
                <RepositoryInfo>
                    <header>
                        <img
                            src={repositoryValue.owner.avatar_url}
                            alt={repositoryValue.owner.login} />
                        <div>
                            <strong>{repositoryValue.full_name}</strong>
                            <p>{repositoryValue.description}</p>
                        </div>
                    </header>
                    <ul>
                        <li>
                            <strong>{repositoryValue.stargazers_count}</strong>
                            <span>Starts</span>
                        </li>
                        <li>
                            <strong>{repositoryValue.forks_count}</strong>
                            <span>Forks</span>
                        </li>
                        <li>
                            <strong>{repositoryValue.open_issues_count}</strong>
                            <span>Issues abertas</span>
                        </li>
                    </ul>
                </RepositoryInfo>
            )}


            <Issues>
                {issues.map(issue => (
                    <a
                    href={issue.html_url}
                    key={issue.id}
                    >
                        <div>
                            <strong>
                                {issue.title}
                            </strong>
                            <p>
                                {issue.user.login}
                            </p>
                        </div>
                        <FiChevronRight size={20} />
                    </a>
                ))}
            </Issues>
        </>
    );
};

export default Repository;
